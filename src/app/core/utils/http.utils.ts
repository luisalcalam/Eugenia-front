export class httpUtils {
  public static getPercentage(current: number, total: number): number {
    return Math.round((current / total) * 100);
  }
}
