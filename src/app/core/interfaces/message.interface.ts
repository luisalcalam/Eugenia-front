import {
  verticalPositionEnum,
  horizontalPositionEnum,
} from '../enums/messageEnums';
export interface commonMessageParams {
  message: string;
  action?: string;
  duration?: number;
  horizontalPosition?: horizontalPositionEnum;
  verticalPosition?: verticalPositionEnum;
}
