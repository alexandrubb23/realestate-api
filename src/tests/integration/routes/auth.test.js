const { User } = require("../../../models/user");
const request = require("supertest");

let server;

describe("/api/auth", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe("POST /", () => {
    let user;
    let email;
    let password;
    let newUserEmail;

    const generateString = (length = 52, char = "a") => {
      return new Array(length).join(char);
    };

    const exec = async () => {
      return await request(server)
        .post("/api/auth")
        .send({ email: newUserEmail, password });
    };

    beforeEach(async () => {
      user = new User({
        name: "12345",
        email: "alex_bb23@yahoo.co.uk",
        password: "123456"
      });

      await user.save();

      newUserEmail = user.email;
    });

    it("should return 400 if email address is less than 5 characters", async () => {
      newUserEmail = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if email address is more than 50 characters", async () => {
      newUserEmail = generateString();

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if email address is invalid", async () => {
      newUserEmail = "12345";

      const res = await exec();

      expect(res.text).toMatch(/valid\semail/);
    });

    it("should return 400 if email address is valid and password is empty", async () => {
      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/"password"/);
    });

    it("should return 400 if the user with the given email not exist", async () => {
      password = "12345";

      const res = await exec();

      const user = await User.findOne({ email: "a" });

      expect(user).toBeNull();
      expect(res.text).toMatch(/invalid/i);
    });

    it("should return 400 if the user with the given email exist", async () => {
      expect(user).toHaveProperty("_id");
      expect(user).toHaveProperty("email", user.email);
    });
  });
});
