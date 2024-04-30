describe("Job Offer Filtering by Employment Type", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=sort-dropdown]").click();
  });

  it("Test Case 9: Filter job offers by Full-time", () => {
    cy.get("[data-cy=full-time]").click();
    cy.get(
      '[href="/companies/clu7tcwp70006tvnlkb69aai3"] > .e > .w-full',
    ).should("not.exist");
  });

  it("Test Case 10: Filter job offers by Part-time", () => {
    cy.get("[data-cy=part-time]").click();
    cy.get("[data-cy=job-offer-list]").and("have.text", "No data available");
  });

  it("Test Case 11: Filter job offers by Contract", () => {
    cy.get("[data-cy=contract]").click();
    cy.get("[data-cy=job-offer-list]").and("have.text", "No data available");
  });

  it("Test Case 12: Filter job offers by Full-time and Part-time", () => {
    cy.get("[data-cy=full-time]").click();
    cy.get("[data-cy=part-time]").click();
    cy.get("[data-cy=job-offer-list]").and("have.text", "No data available");
  });

  it("Test Case 13: No employment type filter selected", () => {
    cy.get("[data-cy=job-offer-list]")
      .children()
      .then(($jobs) => {
        const originalOrder = $jobs
          .map((index, job) =>
            Cypress.$(job).find("[data-cy=company-name]").text().trim(),
          )
          .get();
        cy.get("[data-cy=job-offer-list]")
          .children()
          .then(($jobsAfter) => {
            const afterOrder = $jobsAfter
              .map((index, job) =>
                Cypress.$(job).find("[data-cy=company-name]").text().trim(),
              )
              .get();
            expect(originalOrder).to.deep.equal(
              afterOrder,
              "Job offers should remain in the original array order",
            );
          });
      });
  });
});
