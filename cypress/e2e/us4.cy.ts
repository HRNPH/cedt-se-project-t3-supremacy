describe("Wishlist Functionality for Job Offers", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
    cy.get(".right-0 > div > .text-black").click();
    cy.get("[name=emailAddress]").type("apiphoom23@gmail.com");
    cy.get("[name=password]").type("123");
    cy.get(".select-none").click();
    cy.wait(2000);
  });

  it("Test Case 14: Save a job offer not in the wishlist", () => {
    cy.get(
      '[href="/companies/clu7tcz4i000ctvnltnt4rc1e"] > .e > .w-full',
    ).click();
    cy.get(".ml-2").click();
    cy.visit("/wishlist");
    cy.get(".overflow-hidden > .mx-auto").should("be.visible");
    cy.get('[data-index="0"] > [data-content=""] > div').should("not.exist");
  });

  it("Test Case 15: Save a job offer already in the wishlist", () => {
    cy.get('[href="/wishlist"]').click();
    cy.get(".overflow-hidden > .mx-auto").should("be.visible");
    cy.get(".ml-2").click();
    cy.visit("/");
    cy.get(
      '[href="/companies/clu7tcz4i000ctvnltnt4rc1e"] > .e > .w-full',
    ).click();
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
    cy.get(".ml-2").click();
    cy.visit("/");
    cy.get(
      '[href="/companies/clu7tcz4i000ctvnltnt4rc1e"] > .e > .w-full',
    ).click();
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
    cy.get(".ml-2").click();
    cy.get('[data-index="0"] > [data-content=""] > div').should("be.visible");
  });

  it("Test Case 16: Navigate to wishlist page", () => {
    cy.get(
      '[href="/companies/clu7tcz4i000ctvnltnt4rc1e"] > .e > .w-full',
    ).click();
    cy.get(".ml-2").click();
    cy.visit("/wishlist");
    cy.get(".overflow-hidden > .mx-auto").should("be.visible");
  });
});
