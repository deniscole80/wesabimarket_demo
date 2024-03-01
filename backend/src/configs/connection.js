//const cert = 'MIIEQTCCAqmgAwIBAgIULZxs14KW4wQbwrMRy7u+XN5kzmkwDQYJKoZIhvcNAQEMBQAwOjE4MDYGA1UEAwwvYWQwN2MxNTAtMDM3ZC00Y2VkLWI0N2QtNDg3YzU1MGI2YzY5IFByb2plY3QgQ0EwHhcNMjExMTIwMjM0OTE1WhcNMzExMTE4MjM0OTE1WjA6MTgwNgYDVQQDDC9hZDA3YzE1MC0wMzdkLTRjZWQtYjQ3ZC00ODdjNTUwYjZjNjkgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALE/6FMjTtgJLlEULZdITpQUh7l2AdsAqcgq9TVt/I+N1/jhzdG5qWDvKOxV6VzbA6r2IqVMbPScmLCfyaxHWlfmQ4cFQmh/pUhNDSdIBYMHrQEokaHBux1la5J1+dvki53/Sfrg3Kk+FQkTdu3IWXvCDneCDxy+lbMCJsaEScJLApKHK9mBJo8OTz6GpdS3TJ7Q1FYt2xX3LSkZ11HlFgYjnapc2b8hBKMKiSrtrgs7RFo7HMhPj4/RXwvIL6oNNVxyLpQINcXmbq09l9TxbRoOC8R2Xbz8NYjvAOUZHrmypJX8eOi8do5I3L43p1RdSA6tFycK3hHpSFm6Z0gmrQUyBOWJpuX0JnMu2Sw78s6fmTfqiQRd8m5ai95gZz3XDDAwzD8g84ovCHSbN90uwAlxXIlB2oyl74r5ABNkxz+XsI2FLn4FbyT9p97D5m28ZANpeB4bdJ62bJ2oVvNCorswqo5IaMtHHQeMdQ+e2mBmyngqQW+NIkMcWoQIVJ4/RQIDAQABoz8wPTAdBgNVHQ4EFgQUhkZyQgi+8/aUtNuo8Py7AvMJZS8wDwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKf+KaO4eiaroCWcoishPkWBfp9lsDJwrm4aljML6lOF8acqQZTx/b84NyjuM5MDprtJcr5r/UULrurdJKXulFtwTFqEc74QPXZ5OxW9OWmJ8A6QFzrRElM0U+o7VgsEnlVEoN9RkclS7mG/KgKcWziGy3F0sFOOf9aaUz4sAMUXlkureRKaswXlK4z3pGLmdVoSxM0DfTBoIh8F4O6Uf+7oew1CYsPCf1xWrJ4rA33kTQhU5x3Jvc5ZxITgZ7yJAB+QQOu44yZadQHo132DIf+RcGw3RQI6viPsufhONpTG82kPzy9MbRLn2dJWsfC2fdQXEM2IoAZJO5ZfAWM5GgwjewicpHczHkezd+6Dx6LWHT+BKqXpzDrJfJh4RTY7vPuAyABwAwSgy7dlDUWiorW55er8Zxjd2uPpc3a5BFayZYrlS35f1ledSbQa5VBWM2wg2jCN1O18CwQYQScLoWT88o3Tux8HeqLNI9PXsIQFmnXWsPHKDtewo1bXizKVQg==';
const env = require("./env");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.db_name, env.db_username, env.db_password, {
  host: env.db_host,
  port: 25060,
  dialect: env.db_dialect,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
module.exports = sequelize;
