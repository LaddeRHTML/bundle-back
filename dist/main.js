"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const exception_filters_1 = require("./common/filters/exception.filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true
    });
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    app.useGlobalFilters(new exception_filters_1.AllExceptionsFilter());
    await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map