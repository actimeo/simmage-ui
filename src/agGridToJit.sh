#! /bin/sh

sed -i s/AgGridModule.withAotSupport/AgGridModule.withNg2ComponentSupport/ $(rgrep -l AgGridModule.withAotSupport app/)
