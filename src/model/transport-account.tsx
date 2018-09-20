import { BaseResponse } from '@src/model';

export interface TransitInfoStat {
  goodsTypeCount: number;
  transitTimes: number;
  truckCount: number;
  billCycleJsonStr?: string[];
  classfyStatVOList?: ClassfyStatVO[];
  period?: string;
  totalConsumptionMoney?: string;
  totalMoney?: string;
  totalOilMoney?: string;
  totalSalaryMoney?: string;
  totalTyreMoney?: string;
  totalWeight?: string;
}

export interface ClassfyStatVO {
  classify: string;
  classifyId: string;
  classifyType: number;
  consumptionMoney: string;
  money: string;
  oilMoney: string;
  salaryMoney: string;
  tyreMoney: string;
}

export interface StatRecord {
  auctionId: string;
  goodsStationName: string;
  goodsType: string;
  money: string;
  outBizDate: string;
  quantity: string;
  receiptAddress: string;
  senderAddress: string;
  truckId: string;
  truckNo: string;
  weightUnit: string;
}

export interface ClassifyStatRecord {
  currentPage: number;
  end: boolean;
  items: StatRecord[];
}

export interface TransitInfoStatResp extends BaseResponse<TransitInfoStat> {
}

export interface ClassifyStatRecordResp extends BaseResponse<ClassifyStatRecord> {
}
