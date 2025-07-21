import * as shell from "shelljs";

shell.mkdir( "-p", "dist/src/core/shared/notification/email/templates" );

// Copy all the view templates
shell.cp( "-R", "src/core/shared/notification/email/templates", "dist/src/core/shared/notification/email" );