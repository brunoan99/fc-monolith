import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto'

export interface CheckStockUseCase {
  execute(input: CheckStockInputDto): Promise<CheckStockOutputDto>
}