describe("Job Offer Sorting Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=card-skeleton]", { timeout: 10000 }).should("not.exist");
  });

  it("Test Case 1: Sorts job offers by company rating in descending order", () => {
    cy.get("[data-cy=sort-dropdown]").click();
    cy.get("[data-cy=rating]").click();
    cy.get("[data-cy=job-offer-list]")
      .children()
      .should("have.length.at.least", 6)
      .then(($jobs) => {
        const ratings = $jobs
          .map((index, job) =>
            parseFloat(
              Cypress.$(job).find("[data-cy=company-rating]").text().trim(),
            ),
          )
          .get();
        const sortedRatings = [...ratings].sort((a, b) => b - a);
        expect(ratings).to.deep.equal(
          sortedRatings,
          "Ratings should be in descending order",
        );
      });
  });

  it("Test Case 2: Sorts job offers by company name in alphabetical order", () => {
    cy.get("[data-cy=sort-dropdown]").click();
    cy.get("[data-cy=name]").click();
    cy.get("[data-cy=job-offer-list]")
      .children()
      .should("have.length.at.least", 6)
      .then(($jobs) => {
        const names = $jobs
          .map((index, job) =>
            Cypress.$(job).find("[data-cy=company-name]").text().trim(),
          )
          .get();
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(
          sortedNames,
          "Names should be in alphabetical order",
        );
      });
  });

  it("Test Case 3: Sorts job offers by company rating, then by company name", () => {
    cy.get("[data-cy=sort-dropdown]").click();
    cy.get("[data-cy=name]").click();
    cy.get("[data-cy=rating]").click();
    cy.get("[data-cy=job-offer-list]")
      .children()
      .should("have.length.at.least", 6)
      .then(($jobs) => {
        const jobOffers = $jobs
          .map((index, job) => ({
            rating: parseFloat(
              Cypress.$(job).find("[data-cy=company-rating]").text().trim(),
            ),
            name: Cypress.$(job).find("[data-cy=company-name]").text().trim(),
          }))
          .get();
        const sortedJobOffers = [...jobOffers].sort((a, b) => {
          if (b.rating === a.rating) {
            return a.name.localeCompare(b.name);
          }
          return b.rating - a.rating;
        });
        expect(jobOffers).to.deep.equal(
          sortedJobOffers,
          "Job offers should be sorted by rating, then by name",
        );
      });
  });

  it("Test Case 4: Verifies job offers remain in original array order when no sorting factor is selected", () => {
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
