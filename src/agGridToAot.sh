#! /bin/sh

sed -i s/AgGridModule.withNg2ComponentSupport/AgGridModule.withAotSupport/ $(rgrep -l AgGridModule.withNg2ComponentSupport app/)
