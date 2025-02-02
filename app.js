import express from 'express'
import fs from 'fs/promises'
import path from 'path'

import { fileURLToPath } from 'url'
import { marked } from 'marked'

import { generateData } from './services/dataGenerator.js'
import * as logger from './services/logger.js'

const app = express()
const port = 3000

// Get directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Middleware to parse JSON bodies
app.use(express.json())

// Serve documentation at root
app.get('/', async (req, res) => {
    try {
        const [markdown, template] = await Promise.all([
            fs.readFile(path.join(__dirname, 'readme.md'), 'utf-8'),
            fs.readFile(path.join(__dirname, 'views/template.html'), 'utf-8')
        ])
        
        const html = template.replace('{{content}}', marked(markdown))
        res.send(html)
    } catch (error) {
        await logger.error('Documentation error', { error: error.message, stack: error.stack })
        res.status(500).send('Error loading documentation')
    }
})

// API endpoint that supports query parameters for data generation
app.get('/api', async (req, res) => {
    try {
        const params = { ...req.query, rows: req.query.rows || 10 }
        
        const pretty = params.pretty ? true : false
        delete params.pretty

        if (params.delay) {
            await new Promise(resolve => setTimeout(resolve, +params.delay * 1000))
            delete params.delay
        }
        
        const data = generateData(params)
        
        // Set response based on pretty parameter
        if (pretty) {
            res.set('Content-Type', 'application/json')
            res.send(JSON.stringify(data, null, 2))
        } else {
            res.json(data)
        }
        
        await logger.info('Data generated successfully', { params })
        
    } catch (error) {
        await logger.error('Data generation error', { 
            error: error.message, 
            stack: error.stack,
            params: req.query 
        })
        res.status(500).json({ 
            error: 'Failed to generate data',
            message: error.message,
            details: error.stack
        })
    }
})

// Start the server
app.listen(port, () => {
    logger.info(`Server started`, { port })
}) 