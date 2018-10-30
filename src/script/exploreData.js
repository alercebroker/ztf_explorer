$(document).ready(function () {
    const searchBtn = $('#searchbtn');

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });


    $('#change-columns-btn').on('click', function () {
        $('#showMoreModal [id^=col-]').each(function (i, el) {
            let colId = $(el).attr('id');
            if ($(el).is(':checked')) {
                $('.' + colId).show();
            } else {
                $('.' + colId).hide();
            }
        });

        $('#showMoreModal').modal('hide')
    });

    $("#showMoreModal").on('change', '[id^=col-]', function () {
        let isChecked = $(this).is(':checked');
        if ($(this).attr('id') == 'col-all') {
            if (isChecked) {
                console.log($('[id^=col-]'));
                $('[id^=col-]').prop('checked', true);
            } else {
                $('[id^=col-]').prop('checked', false);
                $.each(defaultCols, function (i, el) {
                    $('#' + el).prop('checked', true);
                });
            }
        } else {
            if (!isChecked) {
                $('#col-all').prop('checked', false);
            }
        }
    });

    $('#anyBand').on("change", function () {
        let isChecked = $(this).is(':checked');
        if (isChecked) {
            $('#mag_tabs .tab-pane').removeClass('active');
            $('#mg').addClass('active');
            $('#magnitudTab [id*=-tab]').removeClass('active');
        } else {
            $('#mg-tab').addClass('active');
        }
    })
    $('#datepickerfirst').change(function () {
        var julianDate = JDate.gregorianToJd(this.value)

        $('#firstjd').val(julianDate)

    });
    $('#firstjd').on("change", function () {
        var JD = this.valueAsNumber;
        var today = JDate.JdToGregorian(JD);

        $('#datepickerfirst').val(today)
    });

    $('#datepickerlast').change(function () {
        var julianDate = JDate.gregorianToJd(this.value)

        $('#lastjd').val(julianDate)

    });
    $('#lastjd').on("change", function () {
        var JD = this.valueAsNumber;
        var today = JDate.JdToGregorian(JD);

        $('#datepickerlast').val(today)
    });

    searchBtn.click(function () {
        let filters = {};
        $.each(searchOptions, function (id, value) {
            if (id === 'filters') {
                let f = {};
                $.each(value, function (key, v) {
                    // caso valores
                    if (typeof v === 'string') {
                        let input = $('#' + key)
                        let isCheckbox = input.is(':checkbox');
                        let v = $('#' + key).val();

                        // si es que el input es checkbox
                        if (isCheckbox) {
                            v = input.is(':checked');
                        }

                        if (v) {
                            f[key] = v;
                        }
                    } else {
                        // caso min max
                        let min = $('#min' + key).val();
                        let max = $('#max' + key).val();

                        if (min !== '' && max !== '') {
                            let values = {
                                min: min,
                                max: max
                            };

                            f[key] = values;
                        }
                    }

                });
                filters[id] = f;
            } else if (id == 'bands') {
                // caso bandas

                if ($('#anyBand').prop('checked')) {
                    let params = {
                        min: $('#minG').val(),
                        max: $('#maxG').val(),
                        slope: {
                            min: $('#minSlopeG').val(),
                            max: $('#maxSlopeG').val(),
                        },
                        mean: {
                            min: $('#minMeanG').val(),
                            max: $('#maxMeanG').val(),
                        },
                        rms: {
                            min: $('#minRmsG').val(),
                            max: $('#maxRmsG').val(),
                        },
                        lastmag: {
                            min: $('#minLastmagG').val(),
                            max: $('#maxLastmagG').val()
                        }
                    };
                    let validParams = {};
                    if (params.min != '' && params.max != '') {
                        validParams.min = params.min;
                        validParams.max = params.max;
                    }

                    delete params.min;
                    delete params.max;

                    $.each(params, function (key, val) {
                        if (val.min != '' || val.max != '') {
                            let values = {};
                            if (val.min != '') {
                                values.min = val.min;
                            }
                            if (val.min != '') {
                                values.max = val.max;
                            }
                            validParams[key] = values;
                        }
                    });

                    filters.bands = {};
                    filters.bands.g = validParams;
                } else {

                }
            } else {
                // caso coordenadas
                if (value.hasOwnProperty('length')) {
                    let RA = $('[name=coordinates] #RA').val();
                    let DEC = $('[name=coordinates] #DEC').val();
                    let RS = $('[name=coordinates] #RA').val();

                    if (RA !== '' && DEC !== '' && RS !== '') {
                        let coords = {
                            ra: RA,
                            dec: DEC,
                            rs: RS
                        };
                        filters[id] = [coords]
                    }

                }
            }

        });

        makeQuery(filters);
    });

    function makeQuery(filters) {
        const defaultCols = {};
        const tableHeader = $('#results-table-head');
        const tableBody = $('#results-table-body');
        searchBtn.prop('disabled', true);
        searchBtn.text('Searching...');

        axios.post(
            '/query', {
                query_parameters: filters
            }
        ).then(function (response) {
            const rows = response.data.results;
            const keys = Object.keys(rows[0]);

            const resTableHead = $('<tr></tr>');

            $('#columns-list').empty();
            $.each(keys, function (i, col) {
                // populate show details modal
                let colId = 'col-' + col;
                let colDetail = colDetails[col];

                let colDiv = $('<div></div>').addClass('col-6');
                let checkDiv = $('<div></div>').addClass('form-check');
                let checkbox = $('<input type="checkbox">').addClass('form-check-input').attr('id', colId);
                let label = $('<label></label>').addClass('form-check-label').attr('for', colId).text(colDetail.colName);

                // populate results table model
                let colHeader = $('<th></th>').addClass(colId).text(colDetail.colName);
                if (!colDetail.visible) {
                    colHeader.hide();
                } else {
                    checkbox.prop('checked', true);
                    defaultCols[col] = colId;
                }

                $('#columns-list').append(colDiv.append(checkDiv.append(checkbox).append(label)));
                resTableHead.append(colHeader);
            });

            // populate results table
            tableHeader.empty();
            tableBody.empty();
            $.each(rows, function (i, row) {
                let tableRow = $('<tr></tr>');
                $.each(row, function (key, val) {
                    let colDetail = colDetails[key];
                    let colId = 'col-' + key;
                    let td = $('<td></td>').text(val).addClass(colId);
                    if (!colDetail.visible) {
                        td.hide();
                    }
                    tableRow.append(td);
                });
                tableBody.append(tableRow);
            });

            tableHeader.append(resTableHead);
            $('#results-table').removeClass('invisible');
            toastr.success('Búsqueda cargada exitosamente');
        }).catch(function (error) {
            console.log(error);
            tableHeader.empty();
            tableBody.empty();
            toastr.error('Error en comunicación con el servidor');
        }).then(function () {
            searchBtn.prop('disabled', false);
            searchBtn.text('Search');
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });
    }
});