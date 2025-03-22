import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
	// Инициализация приложения
	const app = await NestFactory.create(AppModule)

	// Получение сервиса конфигурации (настройки приложения)
	const config = app.get(ConfigService)

	// middleware для парсинга куки
	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	// middleware для валидации запросов
	app.useGlobalPipes(
		// Включаем валидацию запросов
		new ValidationPipe({
			transform: true // Преобразовывать входные данные в соответствии с типами
		})
	)

	// поддержка cors (какие домены могут обращаться к нашему серверу)
	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN'), // Разрешаем обращение только с указанного домена
		credentials: true, // Разрешает отправку cookie и других учетных данных
		exposedHeaders: ['set-cookie'] // какие заголовки могут быть доступны клиенту
	})

	// Запуск приложения на порту 3000
	await app.listen(config.getOrThrow<number>('PORT'))
}
bootstrap()
