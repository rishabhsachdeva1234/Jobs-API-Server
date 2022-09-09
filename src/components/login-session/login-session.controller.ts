import { LessThanOrEqual, MoreThan } from "typeorm";
import { appDataSource } from "../../data-source";
import { LoginSessionEntity } from "./entity/login-session.entity";

export class LoginSessionController {
  public static async addSession(userId: string): Promise<string | null> {
    try {
      await this._deleteSession(userId);
      const loginSessionRepo = appDataSource.getRepository(LoginSessionEntity);
      const { sessionKey } = await loginSessionRepo.save({
        userId,
      });
      return sessionKey ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static async verifySession(
    userId: string,
    sessionKey: string
  ): Promise<boolean> {
    try {
      const loginSessionRepo = appDataSource.getRepository(LoginSessionEntity);
      const session = await loginSessionRepo.findOne({
        where: {
          sessionKey,
          userId,
        },
      });

      if (!session) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private static async _deleteSession(userId: string) {
    try {
      const loginSessionRepo = appDataSource.getRepository(LoginSessionEntity);
      await loginSessionRepo.delete({ userId });
      console.info(`session deleted added for user: ${userId}`);
    } catch (error) {
      console.error(error);
    }
  }

  public static async deleteExpiredSession() {
    try {
      const expiredTime = new Date();
      expiredTime.setHours(expiredTime.getHours() - 2);
      const loginSessionRepo = appDataSource.getRepository(LoginSessionEntity);
      await loginSessionRepo.delete({
        lastConnection: LessThanOrEqual(expiredTime),
      });
      setTimeout(this.deleteExpiredSession.bind(this), 5000);
    } catch (error) {
      console.error(error);
    }
  }
}
