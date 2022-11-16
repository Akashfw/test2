import subdata from "../../submissionData.json"; // do not create this file
// let subdata = [{ submission_link: "http://localhost:8080/", id: 67890 }];
import "cypress-localstorage-commands";

const data = [
  {
    name: "M",
    email: "s@gmail.com",
    password: 1234,
  },
  {
    name: "A",
    email: "a@gmail.com",
    password: 123,
  },
];

// import { start, submitData } from "../../../data";
subdata.map(({ submission_link: url, id }) => {
  describe("Test", function () {
    let acc_score = 1;

    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }
    if (url && url.length) {
      beforeEach(() => {
        cy.restoreLocalStorage();
      });
      afterEach(() => {
        cy.saveLocalStorage();
      });
      it(`Create an Account`, () => {
        cy.visit(url);
        expect(localStorage.getItem("account-data")).to.eq(null);
        cy.get(`form input[type="text"]`).clear().type(data[0].name);
        cy.get(`form input[type="email"]`).clear().type(data[0].email);
        cy.get(`form input[type="password"]`).clear().type(data[0].password);
        cy.get("form")
          .submit()
          .then(() => {
            expect(
              JSON.parse(localStorage.getItem("account-data")).length
            ).to.eq(1);
          });
        cy.then(() => {
          acc_score += 1;
        });
      }); //1
      it(`Create Multiple Accounts`, () => {
        cy.get(`form input[type="text"]`).clear().type(data[1].name);
        cy.get(`form input[type="email"]`).clear().type(data[1].email);
        cy.get(`form input[type="password"]`).clear().type(data[1].password);
        cy.get("form")
          .submit()
          .then(() => {
            expect(
              JSON.parse(localStorage.getItem("account-data")).length
            ).to.eq(2);
          });
        cy.then(() => {
          acc_score += 1;
        });
      }); //1
      it(`Visit the Signin Page and Try signin with wrong password`, () => {
        cy.get(".nav").children("a").eq(1).click();
        cy.get(`form input[type="email"]`).clear().type(data[1].email);
        cy.get(`form input[type="password"]`).clear().type("abcd");
        cy.get("form").submit();
        cy.on("window:alert", (str) => {
          expect(str).to.eq("Wrong Credentials");
        });
        cy.then(() => {
          acc_score += 1;
        });
      }); //1
      it(`Try Signin With Correct Password`, () => {
        cy.visit(url + "signin.html");
        cy.get(".nav").children("a").eq(1).click();
        cy.get(`form input[type="email"]`).clear().type(data[1].email);
        cy.get(`form input[type="password"]`).clear().type(data[1].password);
        cy.get("form").submit();
        cy.on("window:alert", (str2) => {
          if (str2 === "Sign in Successful") {
            acc_score += 1;
          }
        });
      });
    }

    it(`generate score`, () => {
      //////////////
      console.log(acc_score);
      let result = {
        id,
        marks: Math.floor(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
