import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { IJwtPayload } from "../common/interfaces";
import { LocalLoginDto, LocalRegisterDto } from "./dto";
import { DatabaseService } from "../common/database/database.service";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly databaseService: DatabaseService
  ) {}

  private async generateTokens(payload: IJwtPayload) {
    const { sub, email } = payload;

    const jwtPayload: IJwtPayload = {
      sub, // userId
      email,
    };

    if (payload?.userRole) {
      jwtPayload.userRole = payload.userRole;
    }

    if (payload?.firstName) {
      jwtPayload.firstName = payload.firstName;
    }

    if (payload?.lastName) {
      jwtPayload.lastName = payload.lastName;
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
        expiresIn: "12h", // "10m"
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await this.databaseService.users.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  public async registerLocal(userDetails: LocalRegisterDto) {
    const { confirmPassword, ...restUserDetails } = userDetails;

    if (userDetails.password !== confirmPassword) {
      throw new BadRequestException(
        `Password and confirm password does not match`
      );
    }

    /**
     * Check if email is already registered
     */
    const existingUser = await this.databaseService.users.findUnique({
      where: { email: userDetails.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, 12);

    const newUser = await this.databaseService.users.create({
      data: { ...restUserDetails, password: hashedPassword },
      select: {
        id: true,
        email: true,
        mobile: true,
        lastName: true,
        userRole: true,
        googleId: true,
        firstName: true,
      },
    });

    return newUser;
  }

  public async loginLocal(userCredentials: LocalLoginDto) {
    const { email, password } = userCredentials;
    const user = await this.databaseService.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ForbiddenException("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException("Invalid email or password");
    }

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    /**
     * Hash refresh token and
     * Update user's refresh token data
     */
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  public async logOut(user: IJwtPayload): Promise<boolean> {
    /**
     * Verify token payload
     */
    const existingUser = await this.databaseService.users.findUnique({
      where: {
        id: user.sub,
        email: user.email,
      },
    });

    if (!existingUser) {
      throw new ForbiddenException("Invalid token");
    }

    await this.databaseService.users.update({
      where: { id: user.sub },
      data: { refreshToken: null },
    });

    return true;
  }
}
