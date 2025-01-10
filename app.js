import express from 'express'
import fs from 'fs/promises'
import path from 'path'

import { fileURLToPath } from 'url'
import { marked } from 'marked'

import { generateData } from './services/dataGenerator.js'

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
            fs.readFile(path.join(__dirname, 'API_DOCUMENTATION.md'), 'utf-8'),
            fs.readFile(path.join(__dirname, 'views/template.html'), 'utf-8')
        ])
        
        const html = template.replace('{{content}}', marked(markdown))
        res.send(html)
    } catch (error) {
        console.error('Documentation error:', error)
        res.status(500).send('Error loading documentation')
    }
})

// API endpoint that supports query parameters for data generation
app.get('/api', (req, res) => {
    try {
        const params = { ...req.query, rows: req.query.rows || 10 }
        const data = generateData(params)
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate data' })
    }
})

// Start the server
app.listen(port, () => 
    console.log(`Server is running on http://localhost:${port}`)) 