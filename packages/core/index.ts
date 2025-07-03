import { makeInstaller } from "@star-element/utils";
import components from "./component";

const installer = makeInstaller(components);

export * from "@star-element/components";

export default installer;
