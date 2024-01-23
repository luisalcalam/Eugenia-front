export class httpUtils {
  public static getPercentage(current: number, total: number): number {
    return Math.round((current / total) * 100);
  }

  public static getStateFromRouteChange() {
    return history.state.data;
  }
}
