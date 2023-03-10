#!/bin/sh
moduleVersion=$(cat package.json | grep version | awk -F '"' '{print $4}');
if [ "$1" = "1" ];then
  echo $moduleVersion > version.temp
  exit 0
fi;

if [ -f version.temp ];then
  oldVersion=$(cat version.temp)
  if [ $oldVersion = $moduleVersion ];then
    echo
    echo Please update package.json version use 'npm version major|minor|patch'.
    echo
    exit 1
  fi;
fi;