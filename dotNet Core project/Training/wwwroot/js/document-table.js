﻿/*
  root/
  ├─ assignment/
  │  ├─ assignment 1.ts
  │  ├─ assignment 2.ts
  │  ├─ records/
  │  │  ├─ record 1.mp4
  │  │  ├─ record 2.mp4
  ├─ readme.txt
  ├─ note.txt
*/

const rootData = {
	id: 'folder-root',
	name: 'root',
	createdTime: '2021/04/12 08:54:00',
	createdBy: 'Administrator',
	modifiedTime: '2021/04/12 08:54:00',
	modifiedBy: 'Administrator',
	subFolderItems: [
		{
			id: 'folder-000002',
			name: 'assignment',
			createdTime: '2021/04/12 09:07:00',
			createdBy: 'Thinh Le',
			modifiedTime: '2021/04/12 09:07:00',
			modifiedBy: 'Thinh Le',
			subFolderItems: [
				{
					id: 'folder-000003',
					name: 'record',
					createdTime: '2021/04/12 09:10:00',
					createdBy: 'Thinh Le',
					modifiedTime: '',
					modifiedBy: '',
					subFolderItems: [],
					fileItems: [
						{
							id: 'file-000005',
							name: 'record 1',
							extension: 'ts',
							createdTime: '2021/04/12 09:16:17',
							createdBy: 'Thinh Le',
							modifiedTime: '',
							modifiedBy: '',
						},
						{
							id: 'file-000006',
							name: 'record 2',
							extension: 'ts',
							createdTime: '2021/04/12 09:16:24',
							createdBy: 'Thinh Le',
							modifiedTime: '',
							modifiedBy: '',
						},
					],
				},
				{
					id: 'folder-000005',
					name: 'd4ng3r0Us f0ld3r',
					createdTime: '2021/04/13 14:49:00',
					createdBy: 'Thinh Le',
					modifiedTime: '',
					modifiedBy: '',
					subFolderItems: [],
					fileItems: [
						{
							id: 'file-000007',
							name: 's4fe pr0gram',
							extension: 'exe',
							createdTime: 'A few second ago',
							createdBy: 'Thinh Le',
							modifiedTime: '',
							modifiedBy: '',
						},
					],
				},
			],
			fileItems: [
				{
					id: 'file-000003',
					name: 'assignment 1',
					extension: 'ts',
					createdTime: '2021/04/12 09:14:10',
					createdBy: 'Thinh Le',
					modifiedTime: '',
					modifiedBy: '',
				},
				{
					id: 'file-000004',
					name: 'assignment 2',
					extension: 'ts',
					createdTime: '2021/04/12 09:14:38',
					createdBy: 'Thinh Le',
					modifiedTime: '',
					modifiedBy: '',
				},
			],
		},
	],
	fileItems: [
		{
			id: 'file-000001',
			name: 'readme',
			extension: 'txt',
			createdTime: '2021/04/12 08:56:00',
			createdBy: 'Thinh Le',
			modifiedTime: '2021/04/12 08:56:00',
			modifiedBy: 'Thinh Le',
		},
		{
			id: 'file-000002',
			name: 'note',
			extension: 'docx',
			createdTime: '2021/04/12 08:59:00',
			createdBy: 'Thinh Le',
			modifiedTime: '2021/04/12 08:59:00',
			modifiedBy: 'Thinh Le',
		},
	],
};

const documentTableConstants = {
	itemType: {
		folder: 'folder',
		file: 'file',
	},
	rootFolderDirectory: 'root',
	rootFolderId: 'folder-root',
	itemIconCSSClasses: {
		folder: 'bi bi-folder',
		text: 'bi bi-journal-text',
		word: 'bi bi-file-earmark-word-fill word-icon',
		excel: 'bi bi-file-earmark-spreadsheet-fill excel-icon',
		powerPoint: 'bi bi-file-earmark-ppt-fill power-point-icon',
		oneNote: 'bi bi-journal-bookmark-fill one-note-icon',
		program: 'bi bi-gear-fill program-icon',
		file: 'bi bi-file',
	},
	APIEndpoints: {
		GetFoldersFromParentFolder: '/api/Items/GetFoldersFromParentFolder/',
		GetFilesFromParentFolder: '/api/Items/GetFilesFromParentFolder/',
		GetFilesAndFoldersFromParentFolder: '/api/Items/GetFilesAndFoldersFromParentFolder/'
	},
	APIStatus: {
		success: 'success'
    }
};

const pageServices = {
	getURLParams: (_parameter) => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(_parameter);
	},
	getFolderDataFromBrowserStorage: (_key) => {
		return JSON.parse(window.localStorage.getItem(_key));
	},
	setBrowserStorageData: (_key, _value) => {
		window.localStorage.setItem(_key, _value);
	},
};

const documentTableServices = {
	// using
	setBrowserStorageData: (_key, _value) => {
		pageServices.setBrowserStorageData(_key, _value);
    },
	// using
	fetchDataFromAPI: async (_APIendpoint) => {
		return await fetch(_APIendpoint).then((_response) => {
			if (!_response.ok) {
				console.log('Response status is NOT ok!')
				return null
			}
			return _response.json()
		});
	},
	// using
	getFolderDirectoryFromQueryString: () => {
		const folderDirectory = pageServices.getURLParams('directory');
		if (folderDirectory === null) {
			return null;
		}
		return folderDirectory;
	},
	// using
	isRootFolderDirectory: () => {
		let folderDirectory = documentTableServices.getFolderDirectoryFromQueryString();
		if (folderDirectory === null || folderDirectory === documentTableConstants.rootFolderDirectory) {
			console.log('You are currently in the root folder');
			return true;
		}
		console.log(`You are currently in the ${folderDirectory} folder`);
		return false;
    },
	GetTableDataFromBrowerStorage: (_key) => {

    },
	getFolderIdFromBrowserStorage: (_folderDirectory) => {
		return pageServices.getFolderDataFromBrowserStorage(
			_folderDirectory,
		);
	},
	getRootFolderData: () => {
		return rootData;
	},
	isRootFolder: (_folderData) => {
		if (_folderData.id === rootData.id) {
			return true;
		}
		return false;
	},
	isRootDirectory: (_folderDirectory) => {
		if (_folderDirectory === documentTableConstants.rootFolderDirectory) {
			return true;
		}
		return false;
	},
	getCurrentFolderData: (_parentFolderId = documentTableConstants.rootFolderId) => {
		const currentFolderDirectory = documentTableServices.getFolderDirectoryFromQueryString();
		// If it is root, return the root folder data
		if (documentTableServices.isRootDirectory(currentFolderDirectory)) {
			// get current folder' files and folders
			let data;
			$.get(documentTableConstants.APIEndpoints.GetFilesAndFoldersFromParentFolder + _parentFolderId, function (_data, status) {
				data = _data
			});
			return data;
		}
		return pageServices.getFolderDataFromBrowserStorage(
			currentFolderDirectory,
		);
	},
	// using
	getItemIconCSSClass: (_extension) => {
		if (_extension !== null) {
			switch (_extension) {
				case 'txt':
					return documentTableConstants.itemIconCSSClasses.text;
				case 'doc':
				case 'docx':
					return documentTableConstants.itemIconCSSClasses.word;
				case 'xml':
				case 'csv':
				case 'xlsx':
					return documentTableConstants.itemIconCSSClasses.excel;
				case 'exe':
					return documentTableConstants.itemIconCSSClasses.program;
				default:
					return documentTableConstants.itemIconCSSClasses.file;
			}
		} else {
			return documentTableConstants.itemIconCSSClasses.folder;
		}
	},
	updateFolderDirectoryInQueryString: (_directoryName = documentTableConstants.rootFolderDirectory) => {
		const currentFolderDirectory = documentTableServices.getFolderDirectoryFromQueryString();
		const newFolderDirectory = `${currentFolderDirectory}/${_directoryName}`;
		window.history.pushState(
			null,
			null,
			`?directory=${newFolderDirectory}`,
		);
	},
	// thêm một key (directory) - value (folder data) với folder directory hiện tại
	setFolderDirectoryToBrowserStorage: (_folderData) => {
		const currentFolderDirectory = documentTableServices.getFolderDirectoryFromQueryString();
		console.log('currentFolderDirectory: ', currentFolderDirectory);
		pageServices.setBrowserStorageData(
			currentFolderDirectory,
			_folderData,
		);
	},
	addNewItemToCurrentFolderInRootData: (
		_folderData,
		_folderId,
		_newItemData,
	) => {
		if (_folderData.id === _folderId) {
			if ((_newItemData.type = documentTableConstants.itemType.folder)) {
				_folderData.subFolderItems.push(_newItemData);
			} else {
				_folderData.fileItems.push(_newItemData);
			}
			return _folderData;
		}
		for (const child of _folderData.subFolderItems) {
			const result = documentTableServices.addNewItemToCurrentFolderInRootData(
				child,
				_folderId,
				_newItemData,
			);
			if (result) {
				return result;
			}
		}
	},
	searchFolderById: (
		_folderData,
		_folderId = 'folder-root',
	) => {
		if (_folderData.id === _folderId) {
			return _folderData;
		}
		for (const child of _folderData.subFolderItems) {
			const result = documentTableServices.searchFolderById(
				child,
				_folderId,
			);
			if (result) {
				return result;
			}
		}
	},
	makeTempId: (_length) => {
		const result = [];
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < _length; i += 1) {
			result.push(
				characters.charAt(
					Math.floor(Math.random() * charactersLength),
				),
			);
		}
		return result.join('');
	},
};

const documentTable = {
	setNewItemModalInfo: (_itemInfo) => {
		document.getElementById('new-item-modal-title').innerHTML =
			_itemInfo.title;

		document.getElementById('new-item-name-label').innerHTML =
			_itemInfo.name;

		document.getElementById("new-item-name").value = '';

		if (_itemInfo.type === documentTableConstants.itemType.folder) {
			document
				.getElementById('item-type')
				.setAttribute('data-item-type', documentTableConstants.itemType.folder);
		} else {
			document
				.getElementById('item-type')
				.setAttribute('data-item-type', documentTableConstants.itemType.file);
		}
	},
	createANewFileEvent: () => {
		// when click on create a new folder button
		document
			.getElementsByClassName('create-new-folder-option')[0]
			.addEventListener('click', () => {
				documentTable.setNewItemModalInfo({
					title: 'Create a new folder',
					name: 'Folder name',
					type: documentTableConstants.itemType.folder,
				});
			});

	},
	createANewFolderEvent: () => {
		// when click on create a new folder button
		document
			.getElementsByClassName('create-new-file-option')[0]
			.addEventListener('click', () => {
				documentTable.setNewItemModalInfo({
					title: 'Create a new file',
					name: 'File name',
					type: documentTableConstants.itemType.file,
				});
			});
	},
	createANewItemEvent: () => {
		documentTable.createANewFolderEvent();
		documentTable.createANewFileEvent();
	},
	setNewItemData: (_itemInputData) => {
		let id = '';
		let name = _itemInputData.name.value;
		let extension = '';
		let type = documentTableConstants.itemType.folder;

		if (_itemInputData.type === documentTableConstants.itemType.folder) {
			id = 'folder-' + documentTableServices.makeTempId(5);
		} else {
			id = 'file-' + documentTableServices.makeTempId(5);

			// file does have extension
			if (name.lastIndexOf('.') !== -1) {
				extension = name.split('.').pop();
				name = name.substring(0, name.lastIndexOf('.'));
			}

			type = documentTableConstants.itemType.file;
		}

		return { id, name, extension, type };
	},
	getItemInputData: () => {
		// -- item name
		const name = document
			.getElementById('new-item-name');

		// -- item type
		const type = document
			.getElementById('item-type')
			.getAttribute('data-item-type');

		if (name.value === '') {
			return;
		} else {
			return { name, type };
		}
	},
	saveANewItemEvent: () => {
		// save a new item
		document
			.getElementsByClassName('save-new-item')[0]
			.addEventListener('click', () => {
				let currentFolderData = documentTableServices.getCurrentFolderData();
				let itemInputData = documentTable.getItemInputData();
				let newItemData = documentTable.setNewItemData(itemInputData);
				let item = {};

				if (itemInputData.type === documentTableConstants.itemType.folder) {
					// a folder
					item = new classes.Folder(newItemData.id, newItemData.name);
				} else {
					item = new classes.File(newItemData.id, newItemData.name, newItemData.extension);
				}

				currentFolderData = documentTableServices.addNewItemToCurrentFolderInRootData(documentTableServices.getRootFolderData(), currentFolderData.id, item);
				console.log('currentFolderData after saved: ', currentFolderData);
				documentTable.GetTableData(currentFolderData);

				// we also need to update the current folder's sub-folders and files data in browser storage/database:

			});
	},
	loadMenuBarEvents: () => {
		documentTable.createANewItemEvent();
		documentTable.saveANewItemEvent();
	},
	setBrowserStorageData: (_folderDirectory, _folderId) => {
		// Key<Path>: Value<parent folder id>
		documentTableServices.setBrowserStorageData(_folderDirectory, _folderId);
	},
	createItemIcon: (_extension) => {
		const icon = document.createElement('i');
		const iconCSSClass = documentTableServices.getItemIconCSSClass(_extension);
		icon.setAttribute('class', iconCSSClass);

		return icon;
	},
	renderItemTypeData: (_item) => {
		// item type
		let td = document.createElement('td');
		td.setAttribute('class', 'item-type');
		td.setAttribute('data-label', 'File Type');
		const icon = documentTable.createItemIcon(_item.fileExtension);
		td.appendChild(icon);

		return td;
	},
	clickOnFolderEvent: async (_asd) => {
		/*
		documentTableServices.updateFolderDirectoryInQueryString(_item.name);
		let clickedFolderData = documentTableServices.searchFolderById(documentTableServices.getRootFolderData(), _item.id);
		console.log('clickedFolderData', clickedFolderData);
		documentTableServices.setFolderDirectoryToBrowserStorage(JSON.stringify(clickedFolderData));
		documentTable.GetTableData(clickedFolderData);
		*/

		// Get clicked folder Id
		let folderId = event.target.getAttribute('data-id')

		// Update the query string


		// Get clicked folder data
		let tableData = await documentTable.GetTableData(folderId);

		// Render clicked folder
		documentTable.renderTableData(tableData);
	},
	renderItemNameData: (_item) => {
		// item type
		let td = document.createElement('td');
		td.setAttribute('class', 'item-name');
		td.setAttribute('data-label', 'Name');

		// a file
		if (_item.fileExtension !== null) {
			if (_item.fileExtension !== '') {
				td.innerHTML = `${_item.itemData.name}.${_item.fileExtension}`;
			} else {
				td.innerHTML = `${_item.itemData.name}`;
			}
		} else {
			// a folder
			td.className += ' folder-item';
			td.innerHTML = `${_item.itemData.name}`;
			td.setAttribute('data-id', _item.itemData.id);
			td.addEventListener('click', (event) => {
				documentTable.clickOnFolderEvent(event);
			});
		}

		return td;
	},
	renderItemModifiedTimeData: (_item) => {
		// item type
		let td = document.createElement('td');
		td.setAttribute('class', 'modified-time');
		td.setAttribute('data-label', 'Modified');
		td.innerHTML = `${_item.itemData.modifiedTime}`;

		return td;
	},
	renderItemModifiedByData: (_item) => {
		// item type
		let td = document.createElement('td');
		td.setAttribute('class', 'modified-by');
		td.setAttribute('data-label', 'Modified By');
		td.innerHTML = `${_item.itemData.modifiedBy}`;

		return td;
	},
	displayItems: (_item) => {
		console.log(`${_item.itemData.name} (${_item.itemData.id})`);
		const tbody = document
			.getElementsByClassName('document-table')[0]
			.getElementsByTagName('tbody')[0];
		const tr = document.createElement('tr');
		tr.appendChild(documentTable.renderItemTypeData(_item));
		tr.appendChild(documentTable.renderItemNameData(_item));
		tr.appendChild(documentTable.renderItemModifiedTimeData(_item));
		tr.appendChild(documentTable.renderItemModifiedByData(_item));
		// new column
		let td = document.createElement('td');
		tr.appendChild(td);
		tbody.appendChild(tr);
	},
	renderTableData: (_tableData) => {
		if (_tableData !== null) {
			console.log('Data recieved from API: ', _tableData);
			// For each element in the table's data, display them on UI
			_tableData.forEach(documentTable.displayItems)
		}
		else {
			// TODO: display an error page?
		}
	},
	GetTableData: async (_parentFolderId = documentTableConstants.rootFolderId) => {
		// Clear the current table data (if any):
		const tbody = document.getElementsByClassName('document-table')[0]
			.getElementsByTagName('tbody')[0].innerHTML = '';

		// Call API to get current folder' files and folders
		let APIEndpoint = documentTableConstants.APIEndpoints.GetFilesAndFoldersFromParentFolder + _parentFolderId;
		let _tableData = await documentTableServices.fetchDataFromAPI(APIEndpoint);
		if (_tableData !== null) {
			return _tableData;
		}
		else {
			return null;
        }
	},
	loadTableEvents: async () => {
		let tableData = await documentTable.GetTableData();

		// Render table data with data recieved from API
		documentTable.renderTableData(tableData);

		// Write data to browser storage (only with the root folder?)
		if (documentTableServices.isRootFolderDirectory()) {
			let rootFolderDirectory = documentTableConstants.rootFolderDirectory;
			let rootFolderId = documentTableConstants.rootFolderId;
			documentTable.setBrowserStorageData(rootFolderDirectory, rootFolderId);
		}
	},
	loadEvents: () => {
		//documentTable.loadMenuBarEvents();
		documentTable.loadTableEvents();
	},
}

$(document).ready(() => {
	documentTable.loadEvents();
});