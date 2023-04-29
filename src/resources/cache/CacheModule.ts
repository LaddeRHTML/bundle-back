import { Module, CacheModule as NestjsCacheModule, CacheStore } from '@nestjs/common';

import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        NestjsCacheModule.register({
            isGlobal: true,
            ttl: 1000,
            store: redisStore as unknown as CacheStore,
            url: `redis://redis:${process.env.CACHE_PORT}`
        })
    ],
    exports: [NestjsCacheModule]
})
export class CacheModule {}
