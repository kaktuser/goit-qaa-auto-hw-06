describe("Testy API httpbin.org", () => {
  it("GET - Zweryfikuj status i treść odpowiedzi", () => {
    cy.request("https://httpbin.org/get").then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.equal(
        response.body.url,
        "https://httpbin.org/get",
        "URL powinien być https://httpbin.org/get"
      );
    });
  });

  it("POST - Wyślij dane JSON i zweryfikuj odpowiedź", () => {
    cy.request("POST", "https://httpbin.org/post", {
      name: "Cypress",
      type: "Testing",
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.deepEqual(
        response.body.json,
        {
          name: "Cypress",
          type: "Testing",
        },
        "Dane JSON w odpowiedzi powinny odpowiadać wysłanym danym"
      );
    });
  });

  it("PUT - Wyślij dane i zweryfikuj odpowiedź", () => {
    cy.request("PUT", "https://httpbin.org/put", {
      key: "value",
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.deepEqual(
        response.body.json,
        {
          key: "value",
        },
        "Dane JSON w odpowiedzi powinny odpowiadać wysłanym danym"
      );
    });
  });

  it("DELETE - Zweryfikuj status", () => {
    cy.request("DELETE", "https://httpbin.org/delete").then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
    });
  });

  it("GET - Wyślij niestandardowe nagłówki i zweryfikuj odpowiedź", () => {
    cy.request({
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: {
        "User-Agent": "CypressTestAgent",
        "X-Custom-Header": "CustomHeaderValue",
      },
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.equal(
        response.body.headers["User-Agent"],
        "CypressTestAgent",
        "Nagłówek User-Agent powinien odpowiadać"
      );
      assert.equal(
        response.body.headers["X-Custom-Header"],
        "CustomHeaderValue",
        "Nagłówek X-Custom-Header powinien odpowiadać"
      );
    });
  });

  it("GET - Wyślij standardowe nagłówki i zweryfikuj odpowiedź", () => {
    cy.request({
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.equal(
        response.body.headers["User-Agent"],
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Nagłówek User-Agent powinien odpowiadać"
      );
    });
  });

  it("GET - Wyślij parametry zapytania i zweryfikuj odpowiedź", () => {
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      qs: {
        search: "cypress",
        page: 1,
      },
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.deepEqual(
        response.body.args,
        {
          search: "cypress",
          page: "1",
        },
        "Parametry zapytania powinny odpowiadać"
      );
    });
  });

  it("GET - Wyślij losowy parametr zapytania i zweryfikuj odpowiedź", () => {
    const randomValue = Math.random().toString(36).substring(7);
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      qs: {
        random: randomValue,
      },
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.equal(
        response.body.args.random,
        randomValue,
        "Losowy parametr zapytania powinien odpowiadać"
      );
    });
  });

  it("POST - Wyślij dane formularza i zweryfikuj odpowiedź", () => {
    cy.request({
      method: "POST",
      url: "https://httpbin.org/post",
      form: true,
      body: {
        field1: "value1",
        field2: "value2",
      },
    }).then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.deepEqual(
        response.body.form,
        {
          field1: "value1",
          field2: "value2",
        },
        "Dane formularza powinny odpowiadać"
      );
    });
  });

  it("GET - Zweryfikuj czas trwania odpowiedzi", () => {
    cy.request("https://httpbin.org/get").then((response) => {
      assert.isBelow(
        response.duration,
        1000,
        "Czas trwania odpowiedzi powinien być krótszy niż 1 sekunda"
      );
    });
  });

  it("GET - Zweryfikuj typ treści odpowiedzi", () => {
    cy.request("https://httpbin.org/get").then((response) => {
      assert.equal(response.status, 200, "Status powinien być 200");
      assert.include(
        response.headers["content-type"],
        "application/json",
        "Typ treści powinien zawierać application/json"
      );
    });
  });
});
