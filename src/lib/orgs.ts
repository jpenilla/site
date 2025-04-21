import { Organization } from "./types";
import { withMetadata } from "./util";

const allOrgs = import.meta.glob("/src/orgs/*.svx", {
  eager: true,
});

export const organizations = withMetadata(allOrgs, (metadata, component) => {
  return new Organization(metadata.name, metadata.role, metadata.link, component);
});
