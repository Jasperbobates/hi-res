import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const projectsDirectory = join(process.cwd(), "_projects");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = [], directory = "_posts") {
  const realSlug = slug.replace(/\.md$/, "");
  // Resolve file path in a case-insensitive manner so builds work on
  // case-sensitive filesystems (e.g. Vercel Linux) as well as macOS.
  let fullPath = join(process.cwd(), directory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    // Try to find a file that matches the slug case-insensitively
    const dirPath = join(process.cwd(), directory);
    try {
      const files = fs.readdirSync(dirPath);
      const match = files.find((f) => f.toLowerCase() === `${realSlug.toLowerCase()}.md`);
      if (match) {
        fullPath = join(dirPath, match);
      }
    } catch (e) {
      // ignore and let the subsequent readFileSync throw the original error
    }
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  fields.forEach((field) => {
    if (field === "slug") items[field] = realSlug;
    if (field === "content") items[field] = content;
    if (typeof data[field] !== "undefined") items[field] = data[field];
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
    .filter((slug) => slug.endsWith(".md") && !slug.startsWith(".")); // 👈 Ignore .DS_Store and others
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Project functions
export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(projectsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllProjects(fields = []) {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
  return projects;
}
