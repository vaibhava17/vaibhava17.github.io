import {
  certifications,
  community,
  education,
  experience,
  flagshipProjects,
  links,
  otherProjects,
  profile,
  skillCategories,
} from "@/lib/data"

// Static at build time (output: "export"): served as /profile.json.
export const dynamic = "force-static"

/**
 * Machine-readable profile: the single source of truth for Vaibhav's public profile facts (lib/data.ts), for Joji,
 * the job tools and the GitHub profile README. Edit lib/data.ts, never this output.
 */
export function GET() {
  return Response.json({
    source: "https://github.com/vaibhava17/vaibhava17.github.io/blob/main/lib/data.ts",
    profile,
    experience,
    projects: { flagship: flagshipProjects, other: otherProjects },
    skills: skillCategories,
    education,
    certifications,
    community,
    links,
  })
}
