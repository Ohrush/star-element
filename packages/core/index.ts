import { makeInstaller } from "@star-element/utils";
import components from "./component";
import '@star-element/theme/index.css'

const installer = makeInstaller(components);

export * from "@star-element/components";

export default installer;
