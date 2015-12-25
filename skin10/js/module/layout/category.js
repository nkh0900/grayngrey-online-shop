$(document).ready(function() {
	var methods = {
		iCateNo: 0,
		iOrgCateNo: 0,

		exec: function() {
			this.iCateNo = Number(this.queryString('cate_no'));
			this.iOrgCateNo = this.iCateNo;

			if(!this.iCateNo) return;

			methods.get();
		},

		get: function() {
			$.ajax({
				url: '/exec/front/Product/SubCategory',
				dataType: 'json',
				success: function(aCategory) {
					oReSort = {};

					$(aCategory).each(function() {
						if(!oReSort[this.parent_cate_no]) oReSort[this.parent_cate_no] = [];

						oReSort[this.parent_cate_no].push(this);

						if(methods.iCateNo == this.cate_no) methods.iCateNo = this.parent_cate_no;
					});


					if(oReSort[methods.iCateNo]) methods.addNode(oReSort[methods.iCateNo]);
					else {
						$('.xans-layout-category a').each(function() {
							if($(this).attr('href').indexOf('cate_no=' + methods.iOrgCateNo) > -1) $(this).addClass('active');
						});
					}
				}
			});
		},


		addNode: function(aReSort) {
			var aHtml = [];

			aHtml.push('<ul class="sub-category">');

			$(aReSort).each(function() {
				var sClass = (methods.iOrgCateNo === this.cate_no) ? 'active' : '';
				aHtml.push('<li><a href="/product/list.html' + this.param + '" class="'+sClass+'">' + this.name + '</a></li>');
			});

			aHtml.push('</ul>');

			$('.xans-layout-category a').each(function() {
				if($(this).attr('href').indexOf('cate_no=' + methods.iCateNo) > -1) {
					$(this).addClass('active');
					$(this).parent().append(aHtml.join(''));
				}
			});
		},

		queryString: function(sKey) {
			var sQueryString = document.location.search.substring(1);
			var aParam = {};

			if(sQueryString) {
				var aFields = sQueryString.split('&');
				var aField = [];

				for(var i=0; i<aFields.length; i++) {
					aField = aFields[i].split('=');
					aParam[aField[0]] = aField[1];
				}
			}

			return sKey ? aParam[sKey] : aParam;
		}
	}

	methods.exec();
});