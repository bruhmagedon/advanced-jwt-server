import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { IS_DEV_ENV } from './libs/common/utils/id-dev.util'

@Module({
	imports: [
		// Настраиваем ConfigModule
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV, // Если приложение не в режиме разработки, игнорируем файл .env
			isGlobal: true // Делаем ConfigModule глобальным, чтобы он был доступен во всем приложении
		})
	],
	controllers: [],
	providers: []
})
export class AppModule {}
