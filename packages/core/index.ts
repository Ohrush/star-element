import { makeInstaller } from "@star-element/utils";
import components from "./component";
import "@star-element/theme/index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const installer = makeInstaller(components);

export * from "@star-element/components";

export default installer;
