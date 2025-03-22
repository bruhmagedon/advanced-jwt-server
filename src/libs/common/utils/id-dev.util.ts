import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'

// Загружаем переменные окружения из файла .env в process.env
dotenv.config()

// Функция, которая проверяет, находится ли приложение в режиме разработки
export const isDev = (configService: ConfigService) =>
	configService.getOrThrow('NODE_ENV') === 'development'

// Константа, которая проверяет, находится ли приложение в режиме разработки
export const IS_DEV_ENV = process.env.NODE_ENV === 'development'
