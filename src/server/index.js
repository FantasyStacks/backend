import { config as configEnv } from 'dotenv'
import log from 'ololog'

import app from './app'

configEnv()

const { PORT = 8080 } = process.env

app.listen(PORT, () => log(`Listening on port ${PORT}`))
