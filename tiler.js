
import child_process from 'child_process';
import fs from 'fs';


const tipp = `tippecanoe -l suibou`
           + " -e" + ` ./docs/tile/`
           + ` ./dst/*`
           + ' --force'
           /*
           + ' --include=pref'
           + ' --include=muni'
           */
             + " --coalesce" + " --reorder" + " --hilbert"
             + " --no-simplification-of-shared-nodes"
           + ' --no-tile-size-limit' 
           + ' --no-tile-compression'
           + ' --no-feature-limit'
           + ' --minimum-zoom=12'
           + ' --maximum-zoom=12'
           + ' --base-zoom=12'
           + ' --no-line-simplification';  
           

console.log(tipp);
child_process.execSync(`${tipp}`);


