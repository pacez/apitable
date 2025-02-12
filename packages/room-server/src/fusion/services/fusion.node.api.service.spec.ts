/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { FusionNodeApiService } from './fusion.node.api.service';
import { REQUEST } from '@nestjs/core';
import { RestService } from 'shared/services/rest/rest.service';

describe('Test FusionNodeApiService', () => {
  let module: TestingModule;
  let service: FusionNodeApiService;
  let restService: RestService;

  beforeAll(async() => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: RestService,
          useValue: {
            getNodesList: jest.fn(),
          },
        },
        {
          provide: REQUEST,
          useValue: {
            headers: {
              authorization: 'token',
            }
          },
        },
        FusionNodeApiService,
      ],
    }).compile();
    restService = module.get<RestService>(RestService);
    service = module.get<FusionNodeApiService>(FusionNodeApiService);
  });

  it('should be return edit space\'s datasheets', async() => {
    jest.spyOn(restService, 'getNodesList').mockResolvedValue([
      {nodeId: 'datasheetId', nodeName: 'datasheetId', type: 2, icon: '100', parentId: 'parentId'}
    ] as any);
    const nodes = await service.getNodeList('spaceId', 2,'editor');
    expect(nodes.length).toEqual(1);
  });
});