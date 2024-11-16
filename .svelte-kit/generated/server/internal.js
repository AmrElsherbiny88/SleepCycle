
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_dir: "_app",
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\r\n<html lang=\"en\" class=\"dark\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n  <title>SleepCycle</title>\r\n  <meta name=\"robots\" content=\"index , follow\"> \r\n  <meta name=\"author\" content=\"AmrElsherbiny\" />\r\n  <meta name=\"keywords\"\r\n    content=\"Haunted Escape Room Egypt, Haunted Escape Room Lebanon, Horror escape room Egypt, Haunted escape game Lebanon, Scary escape room Egypt, Horror-themed escape room Lebanon, Haunted room Egypt & Lebanon, Mystery escape Egypt, Haunted adventure Lebanon, Escape room Cairo and Beirut, Real-life horror Egypt and Lebanon\" />\r\n  <meta name=\"description\"\r\n    content=\"Escape room game, new concept of entertainment, get locked up in a mysterious room and your mission is to escape in one hour, Choose with or without horror.\" />\r\n\r\n  <link rel=\"canonical\" href=\"\" />\r\n  <meta property=\"og:type\" content=\"website\" />\r\n  <meta property=\"og:site_name\" content=\"SleepCycle\" />\r\n  <meta name=\"application-name\" content=\"SleepCycle\" />\r\n  <meta property=\"og:title\" content=\"SleepCycle\" />\r\n  <meta property=\"og:description\"\r\n    content=\"sleep cycles managment\" />\r\n  \r\n  <meta property=\"og:url\" content=\"\" />\r\n  <meta property=\"og:locale\" content=\"en_US\" />\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n  <meta name=\"mobile-web-app-capable\" content=\"yes\" />\r\n\r\n\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap\" rel=\"stylesheet\" />\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Special+Elite&display=swap\" rel=\"stylesheet\" />\r\n  <link href=\"https://unpkg.com/aos@2.3.1/dist/aos.css\" rel=\"stylesheet\" />\r\n  <style>\r\n    * {\r\n      font-family: \"Comic Sans MS\", \"Comic Neue\",\r\n        \"Chalkboard SE\", sans-serif !important;\r\n      font-display: swap !important;\r\n      font-weight: 1 1000 !important;\r\n    }\r\n  </style>\r\n  " + head + "\r\n</head>\r\n\r\n<body data-theme=\"my-custom-theme\">\r\n  <div style=\"display: contents\">\r\n    " + body + "\r\n  </div>\r\n\r\n  <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>\r\n</body>\r\n\r\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "1667o44"
};

export async function get_hooks() {
	return {
		
		
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
