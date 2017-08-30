const fs = require('fs')
const util = require('util')
const CleanCSS = require('clean-css')
const beautify = require('xml-beautifier')
const minify = require('html-minifier').minify

function read(file) {
  return fs.readFileSync(`data/${file}`, 'utf8')
}

function gen_templates() {
  let text = ''
  for (let file of fs.readdirSync('data/html')) {
    text += `<template name="${file.split('.')[0]}" {{version}}>${read(`html/${file}`).html().cdata('\r\n')}</template>`
  }
  return text
}

String.prototype.cdata = function(first) {
  return `<![CDATA[${first || ''}${this}]]>`
}

String.prototype.template = function(string, text) {
  return this.replace(new RegExp(`\{\{${string}\}\}`, `g`), text)
}

String.prototype.no_white = function() {
  return this.replace(/\s/g, '')
}

String.prototype.css = function() {
  return (new CleanCSS({ level: 2 })).minify(this.replace(/\r?\n/g, '\n')).styles
}

String.prototype.html = function() {
  try {
    return minify(this, {
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    })
  } catch(e) {
    return this
  }
  // return this
}

let xml = read('template.xml')

const data = {
  stylesheet: read('css/stylesheet.css').css().cdata(),
  disporder: read('disporder.data').cdata().no_white(),
  templates: gen_templates(),
  version: `version="1809"`,
}

for (let item in data) {
  xml = xml.template(item, data[item])
}

// xml = beautify(xml)

fs.writeFileSync('data/theme.xml', xml, 'utf8')
