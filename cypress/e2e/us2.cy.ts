describe("Job Offer Interview Rating Display Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
    cy.get(".right-0 > div > .text-black").click();
    cy.get("[name=emailAddress]").type("apiphoom23@gmail.com");
    cy.get("[name=password]").type("123");
    cy.get(".select-none").click();
  });

  it("Test Case 5: Displays interview rating for a company with ratings", () => {
    cy.get(
      '[href="/companies/clu7tcujm0000tvnlipxz47to"] > .e > .w-full > .flex-1 > .flex > [data-cy="company-name"]',
    ).click();
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
    cy.get("[data-cy=star-rating]")
      .should("be.visible")
      .and("contain", "★★★★★")
      .and("have.text", "Ratings★★★★★ (5 out of 5)");
  });

  it("Test Case 6: Displays 'No ratings available' for a company without ratings", () => {
    cy.get(
      '[href="/companies/clu7tcz4i000ctvnltnt4rc1e"] > .e > .w-full',
    ).click();
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
    cy.get("[data-cy=star-rating]")
      .should("be.visible")
      .and("have.text", "RatingsNo rating available");
  });
});
