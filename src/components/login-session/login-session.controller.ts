import { appDataSource } from "../../data-source";
import { LoginSessionEntity } from "./entity/login-session.entity";

export class LoginSessionController {
  public static async addSession(userId: string): Promise<string | null> {
    try {
      await this._deleteSession(userId);
      const loginSessionRepo = appDataSource.getRepository(LoginSessionEntity);
      const { sessionKey } = await loginSessionRepo.save({
        user: userId,
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
    const loginSessionRepo = appDataSource.getRepository(LoginSessionEntity);
    const session = await loginSessionRepo.findOne({
      where: {
        user: userId,
        sessionKey: sessionKey,
      },
    });
    if (!session) return false;
    return true;
  }

  private static async _deleteSession(userId: string) {
    try {
      const sessionRepo = appDataSource.getRepository(LoginSessionEntity);
      await sessionRepo.delete({ user: userId });
      console.info(`session deleted added for user: ${userId}`);
    } catch (error) {
      console.error(error);
    }
  }
}
