"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var http = __toESM(require("http"));

// src/repositories/podcast-repository.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var pathData = import_path.default.join(__dirname, "../repositories/podcasts.json");
var repositoryPodcast = (podcastName) => __async(void 0, null, function* () {
  const data = import_fs.default.readFileSync(pathData, "utf-8");
  let jsonFile = JSON.parse(data);
  if (podcastName) {
    jsonFile = jsonFile.filter(
      (podcast) => podcast.podcastName === podcastName
    );
  }
  ;
  return jsonFile;
});

// src/services/list-episodes-service.ts
var listEpisodesService = () => __async(void 0, null, function* () {
  const data = yield repositoryPodcast();
  return data;
});

// src/services/filter-episodes.ts
var serviceFilterEpisodes = (podcastName) => __async(void 0, null, function* () {
  const data = yield repositoryPodcast(podcastName);
  return data;
});

// src/controllers/podcasts-controller.ts
var getListEpisodes = (request, response) => __async(void 0, null, function* () {
  const content = yield listEpisodesService();
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(content));
});
var getEpisodesByName = (request, response) => __async(void 0, null, function* () {
  var _a, _b;
  const queryString = (_b = (_a = request.url) == null ? void 0 : _a.split("?p=")[1]) != null ? _b : "";
  const content = yield serviceFilterEpisodes(queryString);
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(content));
});

// src/server.ts
var server = http.createServer((request, response) => __async(exports, null, function* () {
  var _a, _b;
  const [baseUrl, queryString] = (_b = (_a = request.url) == null ? void 0 : _a.split("?")) != null ? _b : ["", ""];
  if (request.method === "GET" && request.url === "/api/list") {
    yield getListEpisodes(request, response);
  }
  if (request.method === "GET" && request.url === "/api/episode") {
    yield getEpisodesByName(request, response);
  }
}));
server.listen(process.env.PORT, () => {
  console.log(`SERVIDOR INICIADO COM SUCESSO NA PORTA ${process.env.PORT}!`);
});
