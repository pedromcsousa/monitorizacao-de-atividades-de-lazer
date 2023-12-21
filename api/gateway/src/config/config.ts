const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MQTT_HOST: process.env.MQTT_HOST,
  MQTT_PORT: parseInt(process.env.MQTT_PORT, 10) || 3000,
  MS_LORAWAN_HOST: process.env.MS_LORAWAN_HOST,
  MS_LORAWAN_PORT: parseInt(process.env.MS_LORAWAN_PORT, 10) || 3000,
  MS_MQTT_HOST: process.env.MS_MQTT_HOST,
  MS_MQTT_PORT: parseInt(process.env.MS_MQTT_PORT, 10) || 3000,
};

export default config;
