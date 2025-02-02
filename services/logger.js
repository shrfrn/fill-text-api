import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logPath = path.join(__dirname, '../logs/app.log')

// Ensure logs directory exists
async function ensureLogDirectory() {
    const logDir = path.dirname(logPath)
    try {
        await fs.access(logDir)
    } catch {
        await fs.mkdir(logDir, { recursive: true })
    }
}

function formatLogEntry(level, message, details = null) {
    const timestamp = new Date().toISOString()
    const logParts = [timestamp, level, message]
    if (details) {
        logParts.push(JSON.stringify(details))
    }
    return logParts.join('|') + '\n'
}

async function writeLog(level, message, details = null) {
    try {
        await ensureLogDirectory()
        const logEntry = formatLogEntry(level, message, details)
        await fs.appendFile(logPath, logEntry, 'utf-8')
    } catch (error) {
        console.error('Logging failed:', error)
    }
}

export function info(message, details = null) {
    return writeLog('INFO', message, details)
}

export function error(message, details = null) {
    return writeLog('ERROR', message, details)
}

export function debug(message, details = null) {
    return writeLog('DEBUG', message, details)
} 