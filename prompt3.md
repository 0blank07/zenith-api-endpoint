Aadar@Blank MINGW64 /c/project-files/zenith-api-endpoint (main)
$ npx ts-node src/index.ts sync --missing
C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:859
    return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
src/services/searchService.ts:158:54 - error TS2339: Property 'searchEndpoint' does not exist on type 'SearchService'.

158         const response = await this.client.post(this.searchEndpoint, body);
                                                         ~~~~~~~~~~~~~~
src/services/searchService.ts:159:13 - error TS18046: 'response' is of type 'unknown'.

159         if (response.players && response.players.length > 0) {
                ~~~~~~~~
src/services/searchService.ts:159:33 - error TS18046: 'response' is of type 'unknown'.

159         if (response.players && response.players.length > 0) {
                                    ~~~~~~~~
src/services/searchService.ts:160:26 - error TS18046: 'response' is of type 'unknown'.

160            const batch = response.players.map((p: any) => p.assetId);
                             ~~~~~~~~
src/services/searchService.ts:163:16 - error TS18046: 'response' is of type 'unknown'.

163            if (response.total) total = response.total;
                   ~~~~~~~~
src/services/searchService.ts:163:40 - error TS18046: 'response' is of type 'unknown'.

163            if (response.total) total = response.total;
                                           ~~~~~~~~

    at createTSError (C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:859:12)
    at reportTSError (C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:863:19)
    at getOutput (C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:1077:36)
    at Object.compile (C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:1433:41)
    at Module.m._compile (C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:1617:30)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
    at Object.require.extensions.<computed> [as .ts] (C:\project-files\zenith-api-endpoint\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1266:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1091:12)
    at Module.require (node:internal/modules/cjs/loader:1289:19) {
  diagnosticCodes: [ 2339, 18046, 18046, 18046, 18046, 18046 ]
}
