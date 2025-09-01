import dotenv from "dotenv";

export const loadEnv = () => {
    const result = dotenv.config();
    if(result.error){
        throw new Error("Failed to load environment variables");
    }
}

interface Config {
    port: number;
    dbUrl: string;
    jwtAccess: string;
    jwtRefresh: string;
}

loadEnv();

const config: Config = {
    port: Number(process.env.PORT),
    dbUrl: String(process.env.DATABASE_URL),
    jwtAccess: String(process.env.JWT_SECRET_ACCESS_KEY),
    jwtRefresh: String(process.env.JWT_SECRET_REFRESH_KEY),
}

export default config;