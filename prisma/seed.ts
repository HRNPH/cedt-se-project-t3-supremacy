import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users & Profiles
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice",
        password: "hashedpassword1",
        role: "candidate",
        profile: {
          create: {
            firstName: "Alice",
            lastName: "Doe",
            headline: "Software Engineer",
            bio: "Experienced Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
            telephone: "123-456-7890",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob",
        password: "hashedpassword2",
        role: "candidate",
        profile: {
          create: {
            firstName: "Bob",
            lastName: "Smith",
            headline: "Product Manager",
            bio: "Product Manager with over 10 years of experience in product development, project management, and team leadership.",
            telephone: "098-765-4321",
          },
        },
      },
    }),
  ]);

  // Companies & Job Listings
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "Tech Innovations Inc",
        description:
          "A leading company in tech innovation, focusing on AI and ML solutions.",
        industry: "Technology",
        address: "123 Tech Lane, Tech City, TC 12345",
        website: "https://techinnovations.example.com",
        telephone: "111-222-3333",
        size: 500,
        jobListings: {
          create: [
            {
              title: "Senior Software Engineer",
              description:
                "Develop and maintain advanced software applications.",
              requirements: "5+ years of experience in software development.",
              location: "Remote",
              type: "Full-time",
              expiresAt: new Date(2024, 3, 31),
            },
            {
              title: "Product Manager",
              description: "Lead the product development lifecycle.",
              requirements: "Proven experience as a Product Manager.",
              location: "New York, NY",
              type: "Full-time",
              expiresAt: new Date(2024, 4, 30),
            },
          ],
        },
      },
    }),
    // Add additional companies here following the same structure
  ]);

  console.log("Seeding finished.");
}

// Additional Company Data for Seeding
await prisma.company.create({
  data: {
    name: "PurpleTech Innovators",
    description:
      "Purple Pioneers in sustainable technology solutions, focusing on renewable energy sources.",
    industry: "Renewable Energy",
    address: "456 Green Way, Eco City, EC 67890",
    website: "https://purpletechinnovators.example.com",
    telephone: "222-333-4444",
    size: 300,
    jobListings: {
      create: [
        {
          title: "Renewable Energy Consultant",
          description:
            "Provide expert advice on renewable energy projects and technologies.",
          requirements:
            "Degree in Environmental Science or related field, with 3+ years of consulting experience.",
          location: "Remote",
          type: "Full-time",
          expiresAt: new Date(2024, 5, 15),
        },
        {
          title: "Solar PV Systems Engineer",
          description:
            "Design and implement solar photovoltaic systems for residential and commercial properties.",
          requirements:
            "Degree in Electrical Engineering, with a focus on solar energy systems.",
          location: "Eco City, EC",
          type: "Full-time",
          expiresAt: new Date(2024, 6, 20),
        },
      ],
    },
  },
});

await prisma.company.create({
  data: {
    name: "GreenTech Innovators",
    description:
      "Pioneers in sustainable technology solutions, focusing on renewable energy sources.",
    industry: "Renewable Energy",
    address: "456 Green Way, Eco City, EC 67890",
    website: "https://greentechinnovators.example.com",
    telephone: "222-333-4444",
    size: 300,
    jobListings: {
      create: [
        {
          title: "Renewable Energy Consultant",
          description:
            "Provide expert advice on renewable energy projects and technologies.",
          requirements:
            "Degree in Environmental Science or related field, with 3+ years of consulting experience.",
          location: "Remote",
          type: "Full-time",
          expiresAt: new Date(2024, 5, 15),
        },
        {
          title: "Solar PV Systems Engineer",
          description:
            "Design and implement solar photovoltaic systems for residential and commercial properties.",
          requirements:
            "Degree in Electrical Engineering, with a focus on solar energy systems.",
          location: "Eco City, EC",
          type: "Full-time",
          expiresAt: new Date(2024, 6, 20),
        },
      ],
    },
  },
});

await prisma.company.create({
  data: {
    name: "FinTech Solutions Ltd",
    description:
      "Innovative financial technology services for the digital age, including blockchain and cryptocurrency solutions.",
    industry: "Financial Services",
    address: "789 Finance St, Money City, MC 10112",
    website: "https://fintechsolutions.example.com",
    telephone: "333-444-5555",
    size: 150,
    jobListings: {
      create: [],
    },
  },
});

await prisma.company.create({
  data: {
    name: "Creative Minds Agency",
    description:
      "A leading creative agency specializing in branding, digital marketing, and interactive media.",
    industry: "Marketing and Advertising",
    address: "1010 Innovation Blvd, Creativity City, CC 20220",
    website: "https://creativemindsagency.example.com",
    telephone: "444-555-6666",
    size: 80,
    jobListings: {
      create: [
        {
          title: "Graphic Designer",
          description:
            "Design digital graphics, advertisements, and other visual content for clients across various industries.",
          requirements:
            "Bachelor's degree in Graphic Design or related field, and proficiency in Adobe Creative Suite.",
          location: "Remote",
          type: "Full-time",
          expiresAt: new Date(2024, 7, 1),
        },
        {
          title: "Digital Marketing Specialist",
          description:
            "Develop and implement digital marketing strategies to enhance online presence and engagement.",
          requirements:
            "Proven experience in digital marketing, SEO, and social media management.",
          location: "Creativity City, CC",
          type: "Full-time",
          expiresAt: new Date(2024, 8, 15),
        },
      ],
    },
  },
});

// Company 5 - HealthTech Innovations
await prisma.company.create({
  data: {
    name: "HealthTech Innovations",
    description:
      "At the forefront of medical technology, providing cutting-edge solutions for healthcare providers.",
    industry: "Healthcare Technology",
    address: "2020 Health Way, MedTech Park, MT 30330",
    website: "https://healthtechinnovations.example.com",
    telephone: "555-666-7777",
    size: 200,
    jobListings: {
      create: [
        {
          title: "Biomedical Engineer",
          description:
            "Design and develop new medical devices and technologies to improve patient care.",
          requirements:
            "Degree in Biomedical Engineering or related field, with experience in medical device design.",
          location: "MedTech Park, MT",
          type: "Full-time",
          expiresAt: new Date(2024, 9, 20),
        },
      ],
    },
  },
});

// Company 6 - EcoFriendly Products Inc.
await prisma.company.create({
  data: {
    name: "EcoFriendly Products Inc.",
    description:
      "Dedicated to producing sustainable and environmentally friendly consumer products.",
    industry: "Consumer Goods",
    address: "3030 Green Rd, EcoVille, EV 40440",
    website: "https://ecofriendlyproducts.example.com",
    telephone: "666-777-8888",
    size: 120,
    jobListings: {
      create: [
        {
          title: "Sustainability Specialist",
          description:
            "Lead initiatives to ensure products and processes are environmentally friendly and sustainable.",
          requirements:
            "Degree in Environmental Science or related field, with a passion for sustainability.",
          location: "EcoVille, EV",
          type: "Full-time",
          expiresAt: new Date(2024, 10, 5),
        },
      ],
    },
  },
});

// Company 7 - Global Logistics Solutions
await prisma.company.create({
  data: {
    name: "Global Logistics Solutions",
    description:
      "A world leader in logistics and supply chain management, offering innovative solutions worldwide.",
    industry: "Logistics and Supply Chain",
    address: "4040 Freight Ln, Logistics City, LC 50550",
    website: "https://globallogisticssolutions.example.com",
    telephone: "777-888-9999",
    size: 500,
    jobListings: {
      create: [
        {
          title: "Supply Chain Analyst",
          description:
            "Analyze and optimize the supply chain operations to increase efficiency and reduce costs.",
          requirements:
            "Degree in Supply Chain Management or related field, with experience in data analysis.",
          location: "Remote",
          type: "Full-time",
          expiresAt: new Date(2024, 11, 10),
        },
      ],
    },
  },
});

await prisma.company.create({
  data: {
    name: "NextGen Robotics",
    description:
      "Developing the next generation of robotics technology to enhance human capabilities and productivity.",
    industry: "Robotics and Automation",
    address: "5050 Innovation Drive, Robot City, RC 60660",
    website: "https://nextgenrobotics.example.com",
    telephone: "888-999-0000",
    size: 250,
    jobListings: {
      create: [
        {
          title: "Robotics Engineer",
          description:
            "Design and develop robotic systems and solutions to solve complex problems across various industries.",
          requirements:
            "Degree in Robotics Engineering or related field, with strong programming skills.",
          location: "Robot City, RC",
          type: "Full-time",
          expiresAt: new Date(2024, 12, 15),
        },
        {
          title: "AI Developer",
          description:
            "Develop AI algorithms and systems to enhance the capabilities of our robotic solutions.",
          requirements:
            "Experience with AI and machine learning frameworks, and a strong background in software development.",
          location: "Remote",
          type: "Full-time",
          expiresAt: new Date(2024, 11, 30),
        },
      ],
    },
  },
});

console.log("Seeding finished.");

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
