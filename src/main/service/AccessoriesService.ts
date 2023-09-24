import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Cache } from 'cache-manager';

import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { Order } from 'common/pagination/enums';
import compareObjects from 'common/utils/object/compareObjects';

type Entity = { id: string; name: string; type: string };

const batchAccessoriesCacheKey = 'accessories.batchAccessories';

@Injectable()
export class AccessoriesService {
    constructor(
        private readonly entityManager: EntityManager,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async batchAccessories(pageOptionsDto: PageOptionsDto) {
        const cachedData = (await this.cacheManager.get(batchAccessoriesCacheKey)) as
            | { [key: string]: unknown[] }
            | undefined;

        if (cachedData && compareObjects(cachedData.arguments, pageOptionsDto)) {
            return cachedData;
        }

        if (pageOptionsDto.page < 1 || pageOptionsDto.limit < 1) {
            throw new BadRequestException('Page and limit must be positive integers');
        }

        const entities = [
            'cooler',
            'cpu',
            'fan',
            'gpu',
            'hdd',
            'motherboard',
            'pc_case',
            'power_unit',
            'ram'
        ];

        const results: { type: string; id: string; name: string }[] = [];

        for (const entity of entities) {
            const query = this.entityManager
                .createQueryBuilder()
                .select([':entity AS type', 'id', 'name'])
                .from(entity, '')
                .orderBy('name', pageOptionsDto.order ?? Order.ASC)
                .limit(pageOptionsDto.limit)
                .offset((pageOptionsDto.page - 1) * pageOptionsDto.limit)
                .setParameters({ entity });

            const entityResults = await query.getRawMany();
            results.push(...entityResults);
        }

        const formattedData: { [key: string]: unknown[] } = results.reduce(
            (acc: { [x: string]: Omit<Entity, 'type'>[] }, row: Entity) => {
                const entityType = row.type.toLowerCase();
                if (!acc[entityType]) {
                    acc[entityType] = [];
                }
                acc[entityType].push({ id: row.id, name: row.name });
                return acc;
            },
            {}
        );

        await this.cacheManager.set(
            batchAccessoriesCacheKey,
            { formattedData, arguments: pageOptionsDto },
            10000
        );

        return formattedData;
    }
}
