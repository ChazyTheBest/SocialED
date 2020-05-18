function login()
{
    var form = $( 'form' ),
        email = $( 'input[name=email]' ).val(),
        passwd = $( 'input[name=passwd]' ).val()

    if (email == '' || email == null)
    {
        alert('Debes introducir tu email.')
        return false
    }

    if (passwd == '' || passwd == null)
    {
        alert('Debes introducir tu contraseña.')
        return false
    }

    $.post( form.attr('action'), { email: email, passwd: passwd }, function( data )
    {
        var modal = $( data )

        form.trigger("reset")
        modal.on( 'click', function() { modal.hide() } )

        if ($( 'body > div' ).length)
        {
            $( 'body > div#myModal' ).replaceWith(modal)
        }

        else
        {
            modal.appendTo( 'body' )
        }

        $( 'body > header > menu > a' ).focus()
    })

    return false
}
