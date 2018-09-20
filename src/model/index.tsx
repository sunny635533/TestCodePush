export interface BaseResponse<D> {
  body: D;
  errSerious: boolean;
  success: boolean;
  newSessionId?: string;
  errMsg?: string;
  errCode?: string;
}

export {
  Language
} from '@src/model/lang';

export { ApiConfig, getApiConfig } from './api';

export {
  Env
} from '@src/model/env-config';

export {
  MyRoute,
  MyRouteListResp,
  CityInfoListResp,
  CityInfo,
  GoodTypes,
  GoodTypesListResp
} from '@src/model/my-route';

export {
  TransitInfoStat,
  TransitInfoStatResp,
  ClassfyStatVO,
  ClassifyStatRecord,
  ClassifyStatRecordResp,
  StatRecord
} from '@src/model/transport-account';