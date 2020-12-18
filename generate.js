var YAML = require('yaml')
const fs = require('fs')

function main() {
	const input = YAML.parse(fs.readFileSync('./data.yml', 'utf-8'))
	let output = {}
	for (const [key, value] of Object.entries(input)) {
		let cur = output
		let field = ''
		for (const item of key.split('.')) {
			if (field != '') {
				if (field in cur) {
					cur = cur[field]
				} else {
					cur = cur[field] = {}
				}
			}
			field = item
		}
		cur[field] = value
	}
	const result = YAML.stringify(output).replace(/\"/g, '')
	fs.writeFile('./result.yml', result, err => { err && console.log(err)})

}
main()