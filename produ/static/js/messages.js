function messages()
{
    var msg = $( 'input[name=message]' ).val()

    if ($( 'arcticle > h3' ).length)
    {
        $( 'article' ).prepend( '<h3>Escritos anteriores</h3>' )
    }

    if (msg != '' || msg != null)
    {
        $.post( $( 'form' ).attr('action'), { msg: msg }, function( data )
        {
            $( 'input[name=message]' ).val('')
            if (data == 'success')
                $( 'article' ).append( '<p>' + msg + '</p>' )
            else
            {
                var modal = $( data ).appendTo( 'body' )
                modal.show()
                $( 'body > div#myModal', 'body > div#myModal span.close' ).on( 'click', modal.hide() )
            }
        })
    }

    return false
}
