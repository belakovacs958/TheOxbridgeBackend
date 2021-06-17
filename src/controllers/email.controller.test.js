
import { sendConfirmation } from "./email.controller";

test("send email to user and get accepted",() =>{
    var request = 
    { firstname: 'john',
    lastname: 'doe',
    emailUsername: 'user@user.com',
    password: 'a12345678',
    role: 'user' }
    expect(sendConfirmation(request)).toBe(!null);
})