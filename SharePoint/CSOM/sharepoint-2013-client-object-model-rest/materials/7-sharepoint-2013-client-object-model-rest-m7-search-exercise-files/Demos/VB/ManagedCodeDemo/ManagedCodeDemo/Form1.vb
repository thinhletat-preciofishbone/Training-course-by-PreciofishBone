﻿Imports Microsoft.SharePoint.Client
Imports System.Net
Imports System.Web.Script.Serialization
Imports Microsoft.SharePoint.Client.Taxonomy
Imports Microsoft.SharePoint.Client.UserProfiles
Imports Microsoft.SharePoint.Client.Search.Query

Public Class Form1
    Private Sub TermsButton_Click(ByVal sender As Object, ByVal e As EventArgs) Handles TermsButton.Click
        Dim siteUrl = "http://localhost/sites/demo"
        Using context = New ClientContext(siteUrl)
            Try
                Dim lcid = My.Application.Culture.LCID
                Dim session = TaxonomySession.GetTaxonomySession(context)
                Dim store = session.TermStores.GetByName("Managed Metadata Service")
                Dim group = store.CreateGroup("Managed Code", Guid.NewGuid())
                Dim termSet = group.CreateTermSet("Projects", Guid.NewGuid(), lcid)
                termSet.CreateTerm("Penske Project", lcid, Guid.NewGuid())
                termSet.CreateTerm("Manhattan Project", lcid, Guid.NewGuid())
                termSet.CreateTerm("Alan Parsons Project", lcid, Guid.NewGuid())
                context.ExecuteQuery()

                ResultsListBox.Items.Add("Terms added")
            Catch ex As Exception
                Dim message = ex.GetType().ToString() & Environment.NewLine & ex.ToString()
                MessageBox.Show(message)
            End Try
        End Using
    End Sub

    Private Sub LibraryButton_Click(ByVal sender As Object, ByVal e As EventArgs) Handles LibraryButton.Click
        Dim siteUrl = "http://localhost/sites/demo"
        Using context = New ClientContext(siteUrl)
            Try
                Dim web = context.Web
                Dim lci = New ListCreationInformation()
                lci.Title = "Project Documents"
                lci.TemplateType = CInt(Fix(ListTemplateType.DocumentLibrary))
                Dim list = web.Lists.Add(lci)

                Dim fields = New Field(3) {}
                fields(0) = list.Fields.AddFieldAsXml("<Field Type=""Number"" DisplayName=""Year"" Name=""Year"" Min=""2000"" Max=""2100"" Decimals=""0"" />", True, AddFieldOptions.DefaultValue)
                fields(1) = list.Fields.AddFieldAsXml("<Field Type=""User"" DisplayName=""Coordinator"" Name=""Coordinator"" List=""UserInfo"" ShowField=""ImnName"" UserSelectionMode=""PeopleOnly"" UserSelectionScope=""0"" />", True, AddFieldOptions.DefaultValue)
                fields(2) = list.Fields.AddFieldAsXml("<Field Type=""TaxonomyFieldType"" DisplayName=""Project"" Name=""Project"" ShowField=""Term1033"" Version=""1"" />", True, AddFieldOptions.DefaultValue)
                fields(3) = list.Fields.AddFieldAsXml("<Field Type=""Note"" DisplayName=""Project_0"" Name=""Project_x0020_0"" ShowInViewForms=""FALSE"" Hidden=""TRUE"" CanToggleHidden=""TRUE"" ColName=""ntext2"" />", False, AddFieldOptions.DefaultValue)

                Dim session = TaxonomySession.GetTaxonomySession(context)
                Dim store = session.TermStores.GetByName("Managed Metadata Service")
                Dim group = store.Groups.GetByName("Managed Code")
                Dim termSet = group.TermSets.GetByName("Projects")

                context.Load(fields(2))
                context.Load(store, Function(s) s.Id)
                context.Load(termSet, Function(s) s.Id)
                context.ExecuteQuery()

                Dim taxField = context.CastTo(Of TaxonomyField)(fields(2))
                taxField.SspId = store.Id
                taxField.TermSetId = termSet.Id
                taxField.Update()

                context.ExecuteQuery()

                ResultsListBox.Items.Add("List added")
            Catch ex As Exception
                Dim message = ex.GetType().ToString() & Environment.NewLine & ex.ToString()
                MessageBox.Show(message)
            End Try
        End Using
    End Sub

    Private Sub DocumentButton_Click(ByVal sender As Object, ByVal e As EventArgs) Handles DocumentButton.Click
        Dim siteUrl = "http://localhost/sites/demo"
        Using context = New ClientContext(siteUrl)
            Try
                Dim lcid = My.Application.Culture.LCID
                Dim session = TaxonomySession.GetTaxonomySession(context)
                Dim store = session.TermStores.GetByName("Managed Metadata Service")
                Dim group = store.Groups.GetByName("Managed Code")
                Dim termSet = group.TermSets.GetByName("Projects")
                Dim term = termSet.Terms.GetByName("Alan Parsons Project")

                context.Load(term)
                context.ExecuteQuery()

                Dim web = context.Web
                Dim list = web.Lists.GetByTitle("Project Documents")

                Dim filePath = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory) & "\Samples\Sample01.docx"
                Dim fci = New FileCreationInformation()
                fci.Content = System.IO.File.ReadAllBytes(filePath)
                fci.Url = "Sample01.docx"
                fci.Overwrite = True
                Dim file = list.RootFolder.Files.Add(fci)

                Dim item = file.ListItemAllFields
                item("Year") = Date.Now.Year
                item("Coordinator") = web.CurrentUser
                Dim field = list.Fields.GetByInternalNameOrTitle("Project")
                Dim taxField = context.CastTo(Of TaxonomyField)(field)
                taxField.SetFieldValueByTerm(item, term, lcid)
                item.Update()


                context.ExecuteQuery()

                ResultsListBox.Items.Add("Document uploaded")
            Catch ex As Exception
                Dim message = ex.GetType().ToString() & Environment.NewLine & ex.ToString()
                MessageBox.Show(message)
            End Try
        End Using
    End Sub

    Private Sub PermissionsButton_Click(ByVal sender As Object, ByVal e As EventArgs) Handles PermissionsButton.Click
        Dim siteUrl = "http://localhost/sites/demo"
        Using context = New ClientContext(siteUrl)
            Try
                Dim web = context.Web
                Dim list = web.Lists.GetByTitle("Project Documents")
                context.Load(list, Function(l) l.EffectiveBasePermissions)

                Dim mask = New BasePermissions()
                mask.Set(PermissionKind.ManageLists)
                Dim manageLists = web.DoesUserHavePermissions(mask)

                context.ExecuteQuery()

                Dim addListItems = list.EffectiveBasePermissions.Has(PermissionKind.AddListItems)
                ResultsListBox.Items.Add("Manage Lists: " & manageLists.Value)
                ResultsListBox.Items.Add("Add items to Project Documents: " & addListItems)
            Catch ex As Exception
                Dim message = ex.GetType().ToString() & Environment.NewLine & ex.ToString()
                MessageBox.Show(message)
            End Try
        End Using
    End Sub

    Private Sub ProfileButton_Click(ByVal sender As Object, ByVal e As EventArgs) Handles ProfileButton.Click
        Dim siteUrl = "http://localhost/sites/demo"
        Using context = New ClientContext(siteUrl)
            Try
                Dim manager = New PeopleManager(context)
                Dim profile = manager.GetMyProperties()
                context.Load(profile, Function(p) p.DisplayName, Function(p) p.UserProfileProperties)
                context.ExecuteQuery()

                ResultsListBox.Items.Add("User profile properties for " & profile.DisplayName)
                For Each key In profile.UserProfileProperties.Keys
                    Dim value = profile.UserProfileProperties(key)
                    If Not String.IsNullOrWhiteSpace(value) Then
                        ResultsListBox.Items.Add(key & ": " & value)
                    End If
                Next key
            Catch ex As Exception
                Dim message = ex.GetType().ToString() & Environment.NewLine & ex.ToString()
                MessageBox.Show(message)
            End Try
        End Using

    End Sub

    Private Sub SearchButton_Click(ByVal sender As Object, ByVal e As EventArgs) Handles SearchButton.Click
        Dim siteUrl = "http://localhost/sites/demo"
        Using context = New ClientContext(siteUrl)
            Try
                Dim queryText = "boxes"
                Dim query = New KeywordQuery(context)
                query.QueryText = queryText

                Dim exec = New SearchExecutor(context)
                Dim results = exec.ExecuteQuery(query)

                context.ExecuteQuery()

                ResultsListBox.Items.Add("Search results for """ & queryText & """")
                For Each row In results.Value(0).ResultRows
                    ResultsListBox.Items.Add(row("Title") & ": " & row("Path"))
                Next row
            Catch ex As Exception
                Dim message = ex.GetType().ToString() & Environment.NewLine & ex.ToString()
                MessageBox.Show(message)
            End Try
        End Using
    End Sub
End Class
