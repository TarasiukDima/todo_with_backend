import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });

    await app.listen(3000);
  } catch (error) {
    console.log("Error", error);
  }
};

bootstrap();
